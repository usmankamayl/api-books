FROM node:16.10.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY *.js ./
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routes/ ./routes/
COPY views/ ./views/

CMD ["npm", "run", "start"]