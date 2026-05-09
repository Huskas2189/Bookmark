FROM node:lts AS upstream

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
ENV CONFIG_FILE=/config.yml

COPY . .
COPY --from=upstream /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["node", "build"]
