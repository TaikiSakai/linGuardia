FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y vim

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler

RUN bundle install
COPY . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]