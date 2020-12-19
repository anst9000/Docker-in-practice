# Describing the base image used
FROM node:13-alpine

# Setting some environment variables
ENV MONGO_DB_USERNAME=${MONGO_USERNAME} \
    MONGO_DB_PASSWORD=${MONGO_PASSWORD}

# Set default dir so that next commands executes in /home/app dir
RUN mkdir -p /home/app

# Copy content from local CPU, working directory, to Docker container
COPY ./app/ /home/app

# Creating the entry point and firing up the application
CMD ["node", "/home/app/server.js"]
