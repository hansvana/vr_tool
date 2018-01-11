# Official Node Repo
FROM node:9.3

# ------------------------------
# Set up Node
# ------------------------------

# Set up work dir
WORKDIR /var/www
ADD /app/package.json /var/www/package.json
ADD /app/.env /var/www/.env

# Install dependencies via npm
RUN npm install nodemon -global

# Express will run on port 4000, so we expose that
EXPOSE 4000

# Prepare and run the start script
CMD ["nodemon", "-L", "/var/www/dist/server/server.js"]