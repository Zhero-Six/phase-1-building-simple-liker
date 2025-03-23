// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.like-glyph');
    
    hearts.forEach(heart => {
        heart.addEventListener('click', (e) => {
            const isFullHeart = e.target.textContent === FULL_HEART;
            
            if (isFullHeart) {
                // Change full heart to empty
                e.target.textContent = EMPTY_HEART;
                e.target.classList.remove('activated-heart');
            } else {
                // Attempt to like (empty to full)
                mimicServerCall()
                    .then(() => {
                        // Success case
                        e.target.textContent = FULL_HEART;
                        e.target.classList.add('activated-heart');
                    })
                    .catch((error) => {
                        // Error case
                        const modal = document.getElementById('modal');
                        const errorMessage = document.getElementById('modal-message');
                        
                        errorMessage.textContent = error;
                        modal.classList.remove('hidden');
                        
                        // Hide modal after 3 seconds
                        setTimeout(() => {
                            modal.classList.add('hidden');
                        }, 3000);
                    });
            }
        });
    });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}