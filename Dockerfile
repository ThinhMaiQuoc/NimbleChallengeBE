FROM node:18.16.0

WORKDIR /usr/src/app

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./

RUN npm install

# Copy the rest of your application's code
COPY . .

EXPOSE 3001

# Use the entrypoint script to start your application
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "src/app.js"]
