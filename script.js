document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar functionality
    document.getElementById('toggle-btn').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('hide');
        document.querySelector('.container').classList.toggle('full-width');
        document.querySelector('.header').classList.toggle('full-width');
    });

    // Initialize DataTable
    fetch('../json/tables.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        $('#myTable').DataTable({
            data: data,
            columns: [
                { data: 'PizzaName' },
                { data: 'TotalRevenue' },
                { data: 'TotalQuantity' }
            ],
            pageLength: 10,
            responsive: true
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const dropdownContent = document.querySelector('.sidebar .dropdown-content');

  function addCategory(name, link) {
    const a = document.createElement('a');
    a.href = link;
    a.textContent = name;
    dropdownContent.appendChild(a);
  }

  // Example usage
  addCategory('New Category', 'new-category.html');
});
