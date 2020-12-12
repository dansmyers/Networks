// Setting up a server
// DSM, 2017
// Incorporates code from Beej's Guide to Network Programming

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

#define PORT "10237"  // the port users will be connecting to

#define BACKLOG 10     // how many pending connections queue will hold

int main(void)
{
  // Initialize the address structure
  struct addrinfo *servinfo;
  struct addrinfo hints;

  memset(&hints, 0, sizeof hints);
  hints.ai_family = AF_UNSPEC;
  hints.ai_socktype = SOCK_STREAM;
  hints.ai_flags = AI_PASSIVE; // use my IP

  int rc = getaddrinfo(NULL, PORT, &hints, &servinfo);
  if (rc < 0) {
    perror("getaddrinfo");
    return 1;
  }

  // Create the socket
  int server_fd = socket(servinfo->ai_family, servinfo->ai_socktype, servinfo->ai_protocol);
  if (server_fd < 0) {
    perror("server: socket");
  }

  // Bind the socket
  //Bind connects the socket to the port you
  //Want to listen on 
  rc = bind(server_fd, servinfo->ai_addr, servinfo->ai_addrlen);
  if (rc < 0) {
    close(server_fd);
    perror("server: bind");
  }
    
  // Listen for incoming connections
  //Listen makes the socket actually start listening to that port
  rc = listen(server_fd, BACKLOG);
  if (rc < 0) {
    perror("listen");
    return(-1);
  }

  // Accept incoming requests
  
  printf("Server is running and will accept incoming requests.\n\n");
  
  // A buffer to receive messages
  char buf[140];

  // Loop, accepting and processing incoming messages
  while (1) {
    
    // accept blocks until a client connection arrives
    //accept blocks and waits until a client connection arrives 
    //server stops and waits until a client request comes in
    //accept returns a new descriptor for interacting with clients 
    socklen_t sa_len = sizeof(servinfo);
    int connection_fd = accept(server_fd, (struct sockaddr*) &servinfo, &sa_len);
    if (connection_fd < 0) {
      perror("accept");
      return(-1);
    }
    
    //use connection_fd to interact with client side communication
    //read from connection_fd --> reading bytes sent from client
    //write from connection_fd --> sending bytes to the client 

    printf("Accepted a request.  Descriptor = %d\n", connection_fd);

    rc = read(connection_fd, &buf, sizeof(buf));
    printf("Message: %s\n", buf);
    
    // Write a response to the client
    char * msg = "Done!";
    write(connection_fd, msg, strlen(msg) + 1);

    // Close the connection
    rc = close(connection_fd);
    if (rc < 0){
      perror("close");
      return(-1);
    }
  }


//know socket, bind, listen, accept 

  return 0;
}
