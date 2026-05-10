# node:lts-alpine3.23
FROM node@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS upstream

ARG VERSION

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm version ${VERSION} --no-git-tag-version --allow-same-version

FROM upstream AS build

COPY . .
COPY --from=upstream /app/package.json /app/package-lock.json ./

RUN npm ci
RUN npm run build

FROM upstream AS runner

ENV NODE_ENV=production
ENV BOOKMARK_ORIGIN=http://localhost:3000
ENV CONFIG_FILE=/config.yaml

COPY . .
COPY --from=upstream /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["node", "build"]
