FROM node:carbon
LABEL authors="Kunmyon Choi <kunmyon.choi@sk.com>"

# Copy app source
RUN mkdir -p /www
COPY dist/index.js /www

# Change permission
RUN chown -R node:node /www

# Change current user
USER node
WORKDIR /www

# Set environment variables
ENV HOME /www
ENV NODE_ENV production
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# expose the port to outside world
EXPOSE  18000

# start command as per process.json
CMD ["node", "index.js"]
