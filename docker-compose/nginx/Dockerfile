# Pull in the from the official nginx image.
FROM nginx:1.25.2

EXPOSE 80

# Copy over the custom default configs.
COPY configs/default.conf /etc/nginx/conf.d/default.conf

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]