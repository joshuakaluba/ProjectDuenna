# Use nginx stable as the base image
FROM nginx:stable

# Remove the default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the static website files into the container
COPY ./src /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
