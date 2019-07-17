FROM node:12.6.0

#set working directory
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3002

# tell the port number the container should expose
EXPOSE 3002

# run the command
CMD ["npm", "run", "start"]