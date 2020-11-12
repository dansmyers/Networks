// Basic Web Server
// CMS450, Fall 2014
//
// Includes code adapted from Bryant and O'Hallaron's text

#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>
#include <sys/stat.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <ctype.h>

#define SERVER_PORT 80
#define MAX_PENDING 5
#define MAX_LINE 2048


/** Send the given response message over the given descriptor **/
void 
send_response(int fd, char *response, int response_length) {

  // Fill in code to write the response to the descriptor
  
write(fd, response, response_length);


}


/** Convert the given filetype into an HTML-recognized filetype **/
char * 
get_filetype(char *filename) {
 
  if (strstr(filename, "html")) {
    return "text/html";
  }
  else if (strstr(filename, "jpg") || strstr(filename, "jpeg")) {
    return "image/jpeg";
  }
  else if (strstr(filename, "gif")) {
    return "image/gif";
  } 
  else {
    return "text/plain";
  }
}


/** Construct and send an error message **/
void 
send_error_response(int socket_fd, char *error_num, char *short_msg, char *long_msg) {

   char buf[MAX_LINE];
   char body[MAX_LINE];

   // Create the body of the error message
   sprintf(body, "<html><title>Error %s: %s</title>", error_num, short_msg);
   sprintf(body, "%s<h1>Error %s: %s</h1>\r\n", body, error_num, short_msg);
   sprintf(body, "%s<p>%s\r\n", body, long_msg);

   // Write out the header information for this response
   sprintf(buf, "HTTP/1.0 %s %s\r\n", error_num, short_msg);
   send_response(socket_fd, buf, strlen(buf));
   printf("%s", buf);

   sprintf(buf, "Content-Type: %s\r\n", get_filetype("html"));
   send_response(socket_fd, buf, strlen(buf));
   printf("%s", buf);

   sprintf(buf, "Content-Length: %lu\r\n\r\n", strlen(body));
   send_response(socket_fd, buf, strlen(buf));
   printf("%s", buf);

   // Write out the content
   send_response(socket_fd, body, strlen(body));
   printf("%s", body);
}


/** Process a single HTTP request **/
void 
handle_request(int socket_fd, char *request) {
  int len, i, rc, filesize;
  char method[MAX_LINE];
  char uri[MAX_LINE];
  char version[MAX_LINE];
  char filename[MAX_LINE];
  char *ptr;
  struct strat fdstat;

  // Parse out the HTTP method, the URI, and the version
  sscanf(request, "%s %s %s", method, uri, version);

  // Get the filename by parsing the message URI
  sscanf(uri, "/%s", filename);

  printf("\nMethod = %s\n", method);
  printf("URI = %s\n", uri);
  printf("Version = %s\n", version);
  printf("Filename = %s\n", filename);

  // If the method is not GET, return an error
  if (strcmp(method, "GET")) {
    send_error_response(socket_fd, "501", "Not implemented", "Server does not implement this method");
    pthread_exit(0);
  }
  
  // Open the file for reading
  int fd = open(filename, O_RDONLY);

  if (fd < 0) {
    send_error_response(socket_fd, "404", "File not found", "File not found");
    pthread_exit(0);
  }

  // i had messed up the stat method- fixed 
  rc = stat(filename, &fdstat);
  if (rc < 0) {
    perror("stat");
    exit(1);
  }
  filesize = fdstat.st_size;
// i did not have this part below here involving forbidden error
  if (!(S_ISREG(fdstat.st_mode)) || !(S_IRUSR & fdstat.st_mode)) {
    send_error_response(socket_fd, "403", "Forbidden", "Server could not read this file.");
    return;
  }

// Memory-map the file so that its contents are in a buffer in memory
  // File descriptor is stored in variable named fd
  if ((ptr = (char *) mmap(0, filesize, PROT_READ, MAP_PRIVATE, fd, 0)) <= (char *) 0) {
    perror("mmap");
    exit(1);
  }

  // Form HTTP response message header
  // The return code must be 200 Ok 
  
  // Write the response message header to the descriptor
  sprintf(response, "HTTP/1.0 200 OK\r\n");
  sprintf(response, "%sServer: CMS450  Web Server\r\n", response);
  sprintf(response, "%sContent-Length: %d\r\n", response, filesize);
  sprintf(response, "%sContent-Type: %s\r\n\r\n", response, get_filetype(filename));

  printf("--- HTTTP Response Header ---\n");
  printf("%s\n", response);

  // Write the response message header to the descriptor
  sendResponse(socket_fd, response, strlen(response));

  // Write the file contents to the descriptor
//send_response(int fd, char *response, int response_length)

  // Unmap file
  munmap(ptr, filesize);
  close(fd);
}


/** Listen for messages on a new connection **/
void* 
listen_for_messages(void *arg) {
  int len, listen_fd;
  char buf[MAX_LINE];

  listen_fd = *((int *) arg);

  while ((len = recv(listen_fd, buf, sizeof(buf), 0))) {
    fputs(buf, stdout);
    fflush(stdout);

    handle_request(listen_fd, buf);
  }

  pthread_exit(NULL);
}


int
main(int argc, char * argv[]) {

  struct sockaddr_in sin;
  char buf[MAX_LINE];
  int len, addr_len;
  int s, new_s;
  int rc;

  bzero((char *) &sin, sizeof(sin));
  sin.sin_family = AF_INET;
  sin.sin_addr.s_addr = htonl(INADDR_ANY);
  sin.sin_port = htons((unsigned short) SERVER_PORT);

  if ((s = socket(PF_INET, SOCK_STREAM, 0)) < 0) {
    perror("simplex-talk: socket");
    exit(1);
  }

  if ((bind(s, (struct sockaddr *) &sin, sizeof(sin))) < 0) {
    perror("simplex-talk:bind");
    exit(1);
  }

  listen(s, MAX_PENDING);

  while(1) {

    addr_len = sizeof(struct sockaddr_in);
    if ((new_s = accept(s, (struct sockaddr *) &sin, (socklen_t *) &addr_len)) < 0) {
      perror("accept");
      exit(1);
    }

    // Create a new thread to handle messages on the new connection
    pthread_t listener;
    rc = pthread_create(&listener, NULL, listen_for_messages, (void*) &new_s);
    if (rc < 0) {
      perror("pthread_create");
      exit(1);
    }
  }

  exit(0);
}
