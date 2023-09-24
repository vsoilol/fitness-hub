FROM node:20.7.0 as build

WORKDIR /app

# Copy all JSON files
COPY *.json ./

# Copy lock files
COPY *.lock ./
RUN yarn install --link-duplicates --ignore-optional

COPY ./ ./
RUN yarn build
RUN yarn install --production --link-duplicates --ignore-optional

FROM node:20.7.0 as prod
EXPOSE 3000

WORKDIR /app
USER node
ENV NODE_ENV production

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY ./*.json /app/

CMD ["node", "--expose-gc", "dist/main.js" ]
