document.addEventListener('DOMContentLoaded', () => {
    const addHackathonForm = document.getElementById('addHackathonForm');
    
    if (addHackathonForm) {
      addHackathonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const formData = {
          name: document.getElementById('hackathonName').value,
          location: document.getElementById('hackathonLocation').value,
          date: document.getElementById('hackathonDate').value,
          description: document.getElementById('hackathonDescription').value,
          image: document.getElementById('hackathonImage').value
        };
  
        const response = await fetch('/api/hackathons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          alert('Hackathon added successfully');
          window.location.href = '/';
        } else {
          alert('Error adding hackathon');
        }
      });
    }
  
    const hackathonList = document.getElementById('hackathonList');
  
    if (hackathonList) {
      fetch('/api/hackathons')
        .then(response => response.json())
        .then(data => {
          hackathonList.innerHTML = data.map(hackathon => `
            <div class="hackathon-box">
              <div class="hackathon-image" style="background-image: url(${hackathon.image})"></div>
              <div class="hackathon-info">
                <div class="hackathon-name">${hackathon.name}</div>
                <div class="hackathon-location">${hackathon.location}</div>
                <div class="hackathon-date">${hackathon.date}</div>
              </div>
            </div>
          `).join('');
        });
    }
  });
  