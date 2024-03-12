const terminalBody = document.querySelector('.terminal-body');
const outputDiv = document.getElementById('output');


function handleCommand(event) {
  if (event.key === 'Enter') {
    const commandInput = document.getElementById('commandInput');
    const command = commandInput.value;

    processCommand(command);

    commandInput.value = ''; // Clear the input field
  }
}

function processCommand(command) {

  switch (command) {
    case 'help':
      displayOutput('List of available commands:<br>help - Display help<br>version - Show version <br> myip - show your ip <br> ping - ping a website <br> clear - clear the terminal <br> website - our offcial website ');
            break;
    case 'version':
      displayOutput('scriptbin linux version 2024.1');
      break;
    case 'website':
      displayOutput('https://rxpzpentium.github.io/ScriptBin/')
      break;
    case 'myip':
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          displayOutput('Your public IP address is: ' + data.ip);
        })
        .catch(error => {
          displayOutput('Failed to retrieve IP address. Please try again.');
        });
      break;
    case 'ping':
      displayOutput('Please provide a website to ping. Example: ping example.com');

      break;
    case 'clear':
      outputDiv.innerHTML = '';
      break;
    default:
      displayOutput(`Command not found: ${command}`);

      if (command.startsWith('ping ')) {
        const website = command.substring(5); // Remove 'ping ' from the command
        displayOutput(`Pinging ${website}...`);
        const startTime = performance.now();
        fetch(`https://${website}`)
          .then(response => {
            const endTime = performance.now();
            const pingTime = endTime - startTime;
            displayOutput(`Pinged ${website}. Response time: ${pingTime}ms`);
          })
          .catch(error => {
            displayOutput(`Failed to ping ${website}. Error: ${error.message}`);
          });
      } else {
        displayOutput(`Command not found: ${command}`);
      }
  }
}

function displayOutput(message) {
  const output = document.createElement('div');
  output.innerHTML = message;
  outputDiv.appendChild(output);
}
