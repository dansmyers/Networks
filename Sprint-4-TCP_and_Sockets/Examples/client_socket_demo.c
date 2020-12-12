// Setting up a client-side socket connection
// DSM, 2016

//A socket in c is an endpoint that an application uses to connect to the network

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

int main(int argc, char** argv) {

  // Initialize the address structure
  struct addrinfo *servinfo;
  struct addrinfo hints;

  // hints sets up the parameters for the connection
  memset(&hints, 0, sizeof hints); // Clear the struct
  hints.ai_family = AF_INET;     // Use either IPv4 or IPv6
  hints.ai_socktype = SOCK_STREAM; // Use TCP


//Could use SOC_GRAM for a UDP socket

  int rc = getaddrinfo("localhost", "10237", &hints, &servinfo);
  if (rc != 0) {
    perror("getaddrinfo");
    exit(1);
  }
  
  // Create the socket
  // Returns a descriptor that refers to the new connection
  int client_fd = socket(servinfo->ai_family, servinfo->ai_socktype, 0);
  if (client_fd < 0) {
    perror("socket");
    return(-1);
  }

  // Connect the socket
  rc = connect(client_fd, servinfo->ai_addr, servinfo->ai_addrlen);
  if (rc < 0) {
    perror("connect");
    exit(1);
  }

  // Write something to the socket
  //How you send data to a socket
  //Writing to socket is the same as writing to a file
  write(client_fd, "Hello, Server!", 140);
  
  // Read the server's response
  //Same with read, use read system call same as file
  char response[64];
  read(client_fd, response, sizeof(response));
  printf("Server's response: %s\n", response);
  
  
  //sequnce of functions: socket --> connect --> write/read 
  //can control the protocols used by the sockett
  //EVERYTHING IS TREATED AS A FILE IN UNIX
  // Close the connection
  close(client_fd);

}

