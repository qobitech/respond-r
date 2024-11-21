# Stage 1: Build Stage
FROM node:20.13.0-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Production Stage
FROM node:18.17.0-alpine
WORKDIR /app
COPY --from=build /app/build ./build

# Cleanup: Remove unnecessary dependencies and clean Yarn cache
RUN rm -rf /app/node_modules && \
    yarn cache clean

# Install serve globally
RUN yarn global add serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
