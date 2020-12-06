// Setting up a client-side socket connection
// DSM, 2016

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
  
  //Could use SOCK_DGRAM for a UDP socket

  int rc = getaddrinfo("localhost", "10237", &hints, &servinfo);
  if (rc != 0) {
    perror("getaddrinfo");
    exit(1);
  }
  
  // Create the socket
  // Returns a descriptor that refers to the new connection
  //client_fd is the client socket file descriptor
  //This is an int that refers to the table of open socket connections held by the OS
  int client_fd = socket(servinfo->ai_family, servinfo->ai_socktype, 0);
  if (client_fd < 0) {
    perror("socket"); //Print an error and exit the program if client_fd is negative
  int client_fd = socket(servinfo->ai_family, servinfo->ai_socktype, 0);
  if (client_fd < 0) {
    perror("socket");
    return(-1);
  }

  // Connect the socket
  //connect call depends on sever already being up and running
  rc = connect(client_fd, servinfo->ai_addr, servinfo->ai_addrlen);
  if (rc < 0) {
    perror("connect");
    exit(1);
  }

  // Write something to the socket - this is how you send data
  //Writing to a socket is the same as writing to a file
  write(client_fd, "Hello, Server!", 140);
  
  // Read the server's response
  //Reading from a socket is also like reading from a file
  // Write something to the socket
  write(client_fd, "Hello, Server!", 140);
  
  // Read the server's response
  char response[64];
  read(client_fd, response, sizeof(response));
  printf("Server's response: %s\n", response);
  
  // Close the connection
  close(client_fd);
  
  //Key ideas:
  //The sequence of functions you need for the client side open is to create the socket, connect the socket, and then you can write/read 
  //When you create a socket, you can control the protocols used by the socket
  //EVERYTHING IS A FILE

}

