# Stage 0, "build-stage" to build and compile the frontend
FROM node:12 as build-stage
WORKDIR /app

RUN npm install
COPY . ./
RUN npm run build

# Stage 1, to have only the compiled app, ready for production with Nginx
from nginx:1.17
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
