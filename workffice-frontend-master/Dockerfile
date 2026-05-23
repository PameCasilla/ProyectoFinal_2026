FROM node:lts-alpine3.14

WORKDIR /workffice-client

COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

RUN echo "REACT_APP_SERVER_HOST='https://workffice-be-niconunez96.cloud.okteto.net'" > .env
RUN npm run build


FROM nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /workffice-client/build /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
