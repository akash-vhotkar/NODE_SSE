const eventSource = new EventSource('http://localhost:5000/stream', {
  withCredentials: false
})

function updateMessage (message) {
  const list = document.getElementById('messages')
  const item = document.createElement('p')
  item.textContent = message
  list.appendChild(item)
}

eventSource.onmessage = function (event) {
  console.log("the message on the data ", event);
  if(event.data ==='hello from server to 6 client'){
    eventSource.close();
  } 
  updateMessage(event.data)
}
  
eventSource.onerror = function (event) {
  console.log("the on error ", event);
  
  updateMessage('Server closed connection')
  eventSource.close()
}
