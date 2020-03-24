FROM node:10

ENV HOST localhost
ENV PORT 3000
ENV MEMORYNODE 2048
ENV USE_SSL 0

# Add some extra tool
RUN apt-get update && \
    apt-get install nano
    # Clean
RUN apt-get clean && \
    apt-get autoclean
RUN rm -rf /var/lib/apt/lists/*

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app 

# Install GYP dependencies globally, will be used to code build other dependencies
RUN npm install -g --production node-gyp && \
    npm cache clean --force

# Install Gekko dependencies
COPY package.json .
RUN npm update -g && \
    npm install --production && \
    npm install --production redis talib tulind pg convnetjs mathjs && \
    npm cache clean --force

# Install Gekko Broker dependencies
WORKDIR exchange
COPY exchange/package.json .
RUN npm update -g && \
    npm install --production && \
    npm cache clean --force
WORKDIR ../

# Install cpanminus.
RUN curl -L http://cpanmin.us | perl - App::cpanminus

# Install perl dependencies for Gekko-BacktestTool.
RUN cpanm -n install Parallel::ForkManager Time::Elapsed Getopt::Long List::MoreUtils File::chdir Statistics::Basic DBI DBD::SQLite JSON::XS TOML File::Basename File::Find::Wanted Template LWP::UserAgent LWP::Protocol::https Set::CrossProduct DBD::CSV Text::Table File::Copy

# Bundle app source
COPY . /usr/src/app


# Install Genetic Algorithm for solving optimization of trading strategies using Gekko

WORKDIR gekkoga
    RUN npm install 
WORKDIR ../



EXPOSE 3000
RUN chmod +x /usr/src/app/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

CMD ["--config", "config.js", "--ui"]
