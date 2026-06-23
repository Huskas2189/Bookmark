# node:lts-alpine3.23
FROM node:lts-alpine3.23@sha256:7c70d1235c0b4c2bc9eeed5393d19f1bbdde6885ba0d58ba62bb385d7b0f3ff1 AS upstream

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

ARG VERSION
ARG BUILD_DATE

LABEL org.opencontainers.image.title="Bookmark" \
      org.opencontainers.image.description="A simple self-hosted dashboard for homelab bookmarks." \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="https://codeberg.org/huskas-2189/Bookmark" \
      org.opencontainers.image.licenses="GNU General Public License v3.0"

ENV NODE_ENV=production
ENV BOOKMARK_ORIGIN=http://localhost:3000
ENV CONFIG_FILE=/config.yaml

COPY . .
COPY --from=upstream /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build
COPY ./docker/healthcheck.js /healthcheck.js

HEALTHCHECK CMD ["node", "/healthcheck.js"]

EXPOSE 3000
CMD ["node", "build"]
