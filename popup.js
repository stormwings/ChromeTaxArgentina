window.onload = function() {
  $inputName = document.getElementById('name');
  $greetingText = document.getElementById('greetings');
  
  $inputName.addEventListener("keyup", event => {
    const { target: { value } } = event;

    $greetingText.innerHTML = `Hello ${value}`;
  });
}
