export async function fetchJobs() {

    const BEARER_TOKEN = "3125mhow3125";

    const response = await fetch('http://localhost:5430/api/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  }
  
  export async function fetchJobById(id) {
    const response = await fetch(`http://localhost:5430/api/jobs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    return response.json();
  }
  