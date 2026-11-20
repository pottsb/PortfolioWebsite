FROM alpine:3.24

RUN apk add --no-cache ffmpeg

COPY run.sh /run.sh
RUN chmod +x /run.sh

CMD ["/run.sh"]
