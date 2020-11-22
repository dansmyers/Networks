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
#include <linux/memfd.h>

const size_t SIZE = 1024;

#define SERVER_PORT 5031
#define MAX_PENDING 5
#define MAX_LINE 2048


/** Send the given response message over the given descriptor **/
void 
send_response(int fd, char *response, int response_length) {
  write(fd, response,  response_length);
  // Fill in code to write the response to the descriptor

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
  else if (strstr(filename, "ico")) {
    return "image/ico";
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
  char buf[MAX_LINE];
  char *ptr;
  // FILE *fd;

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

  // If the file does not exist, return a 404 error message
    int f = fopen(filename,"r");
  if (f == NULL){
       send_error_response(socket_fd, "404", "File Not Found", "The requested file is not found on the server. Please check the url.");
        pthread_exit(0);
   }


 
    int fd = open (filename, O_RDONLY);
    if (fd == -1) {
        perror("memfd_create");
    }



  // Stat the file to learn its size
  struct stat size;
  if(stat(filename,&size) == -1){
    printf("Couldn't get the file size \n");
  }
  printf(" file size : %ld , \n", size.st_size);

  
  // // Memory-map the file so that its contents are in a buffer in memory
    char * data = (char *) mmap(NULL, size.st_size, PROT_READ, MAP_SHARED, fd, 0);
    if (data == MAP_FAILED) {
        perror("mmap");
    }

  // Form HTTP response message header
  // The return code must be 200 OK
   // Write the response message header to the descriptor
   sprintf(buf, "HTTP/1.1 %s\r\n", "200");
   send_response(socket_fd, buf, strlen(buf));

   sprintf(buf, "Content-Type: %s\r\n", get_filetype(filename));
   send_response(socket_fd, buf, strlen(buf));

   sprintf(buf, "Content-Length: %lu\r\n\r\n", strlen(data));
   send_response(socket_fd, buf, strlen(buf));

  // Write the file contents to the descriptor
   send_response(socket_fd, data, strlen(data));

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