// Setting up a client-side socket connection
// DSM, 2016

// A socket is an endpoint that an application used to
// connect to the netork
//
// Client socket -- active open, wants to initiate a connection
// Server socket -- passive open, wants to wait to receive 
// incoming client connections

// Here in the client, we're interested in creating a socket,
// connecting it to a server, and then sending messages and
// possibly receiving responses

// Server side will create a socket, bind it to a port, and then
// liseten for incoming connections

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
  
  // Could use SOCK_DGRAM for a UDP socket

  int rc = getaddrinfo("localhost", "10237", &hints, &servinfo);
  if (rc != 0) {
    perror("getaddrinfo");
    exit(1);
  }
  
  // Create the socket
  // Returns a descriptor that refers to the new connection
  //
  // client_fd is client socket "file descriptor"
  // int that refers to a table of open socket connections
  // managed by the OS
  int client_fd = socket(servinfo->ai_family, servinfo->ai_socktype, 0);
  if (client_fd < 0) {
    perror("socket");
    return(-1); // negatuve errir code indicates abnormal termination
  }

  // Connect the socket
  rc = connect(client_fd, servinfo->ai_addr, servinfo->ai_addrlen);
  if (rc < 0) {
    perror("connect");
    exit(1);
  }

  // Write something to the socket
  //
  // Writing to a socket is the same as writing to a file
  write(client_fd, "Hello, Server!", 140);
  
  // Read the server's response
  //
  // Reading from a socket is also like reading from a file
  char response[64];
  read(client_fd, response, sizeof(response));
  printf("Server's response: %s\n", response);
  
  // Close the connection
  close(client_fd);
  
  // Key ideas
  //
  // Sequence of functions: socket --> connect --> write/read (send/recv)
  // Can control the protocols used by the socket
  // EVERYTHING IS A FILE

}

