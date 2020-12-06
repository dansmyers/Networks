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

fd_set set;

/** Send the given response message over the given descriptor **/
void 
send_response(int fd, char *response, int response_length) {

  int rc = write(fd, response, response_length);
  if (rc != response_length) {
    perror("write");
    exit(1);
  }
    
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

  int len, i, rc, filesize,size;

  int len, i, rc, filesize;

  char method[MAX_LINE];
  char uri[MAX_LINE];
  char version[MAX_LINE];
  char filename[MAX_LINE];
  char *ptr;

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

  char path1[MAX_LINE];
  char path2[MAX_LINE];
  
  //strcpy(path1, "./");
  //strcat(path1, filename);
  //printf("%s\n",path1);
  
  // start file stream
  //FILE *fptr;
  //fptr = fopen(filename,"r");
  
  int fd = open(filename, O_RDONLY);
  if (fd < 0) {
            send_error_response(socket_fd, "404", "Not Found", "File Not Found");
            pthread_exit(0);

  }
  
  /***
  if (fptr == NULL){
      send_error_response(socket_fd, "404", "Not Found", "File Not Found");
      
      // Move pthread exit to here

      
       printf("Error opening file on first try\n");

       // try to open using other path
       strcpy(path2, "./files/");
       strcat(path2, filename);
       if ((fptr = fopen(path2,"r")) == NULL){
            printf("Error opening file");
            send_error_response(socket_fd, "404", "Not Found", "File Not Found");
            
            // Program exits if the file pointer returns NULL.
            pthread_exit(0);
        }
   }

  // get file descriptor
  int fd = fileno(fptr);
  
  printf("This is the opened the fd = %d\n", fd);     
  ***/


  // Stat the file to learn its size
  struct stat buff;
  //fstat(fd, &buff);
  //int size = buff.st_size;
  rc = stat(filename, &buff);
  if (rc < 0) {
    perror("stat");
    exit(1);
  }
  size = buff.st_size;
  
  printf("File size = %d\n", size);

  // Memory-map the file so that its contents are in a buffer in memory
  // File descriptor is stored in variable named fd
  if ((ptr = (char *) mmap(0, size, PROT_READ, MAP_PRIVATE, fd, 0)) <= (char *) 0) {
    perror("mmap");
    exit(1);
  }
  
  printf("%p\n", ptr);

  // Form HTTP response message header
  // The return code must be 200 OK
  char buf[MAX_LINE];
 
  sprintf(buf, "HTTP/1.0 200 OK\r\n");
  //send_response(socket_fd, buf, strlen(buf));
  printf("%s", buf);
  
  sprintf(buf, "%sServer: CMS450 Web Server\r\n", buf);
  //send_response(socket_fd, buf, strlen(buf));
  printf("%s", buf);
  
  sprintf(buf, "%sContent-Length: %d\r\n", buf, size);
  //send_response(socket_fd, buf, strlen(buf));
  printf("%s", buf);


  sprintf(buf, "%sContent-Type: %s\r\n\r\n",buf, get_filetype(filename));
  
  printf("%s", buf);
  
  send_response(socket_fd,buf, strlen(buf));
  //send_response(socket_fd, buf, strlen(buf));
  printf("%s", buf);
  
  //printf("%s", buf);
  // Write the response message header to the descriptor
  
  // Write the file contents to the descriptor
  send_response(socket_fd, ptr, size);
  
  
  // Unmap file
  munmap(ptr, size);
  close(fd);
  //close(socket_fd);
  

  // If the file does not exist, return a 404 error message

  // Stat the file to learn its size

  // Memory-map the file so that its contents are in a buffer in memory
  // File descriptor is stored in variable named fd
  if ((ptr = (char *) mmap(0, filesize, PROT_READ, MAP_PRIVATE, fd, 0)) <= (char *) 0) {
    perror("mmap");
    exit(1);
  }

  // Form HTTP response message header
  // The return code must be 200 OK

  // Write the response message header to the descriptor

  // Write the file contents to the descriptor

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
