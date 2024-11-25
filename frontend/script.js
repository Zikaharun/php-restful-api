const apiBaseUrl = "http://localhost/php-restful-api/backend/api.php"; // Sesuaikan dengan URL server Anda

// Fetch data mahasiswa dan tampilkan di tabel
function fetchMahasiswa() {
  fetch(apiBaseUrl)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#mahasiswaTable tbody");
      tableBody.innerHTML = ""; // Clear table

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id_mahasiswa}</td>
          <td>${item.nim}</td>
          <td>${item.nama}</td>
          <td>${item.jenis_kelamin}</td>
          <td>
      <button class="edit-btn" data-id="${item.id_mahasiswa}" 
              data-nim="${item.nim}" data-nama="${item.nama}" 
              data-jenis_kelamin="${item.jenis_kelamin}">Edit</button>
      <button class="delete-btn" data-id="${item.id_mahasiswa}">Delete</button>
    </td>
        `;
        tableBody.appendChild(row);
      });

      addDeleteListeners();
      addEditListeners();
      
    })

    .catch((error) => console.error("Error fetching data:", error));
}

// Tambah mahasiswa baru
document.querySelector("#mahasiswaForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nim = document.querySelector("#nim").value;
  const nama = document.querySelector("#nama").value;
  const jenis_kelamin = document.querySelector("#jenis_kelamin").value;

  fetch(apiBaseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ nim, nama, jenis_kelamin }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result[0]?.status === "success") {
        alert("Mahasiswa berhasil ditambahkan!");
        fetchMahasiswa(); // Refresh tabel
      } else {
        alert("Gagal menambahkan mahasiswa.");
      }
    })
    .catch((error) => console.error("Error adding mahasiswa:", error));
});

document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idMahasiswa = e.target.dataset.id;

      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        fetch(`${apiBaseUrl}?id_mahasiswa=${idMahasiswa}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((result) => {
            if (result[0]?.status === "success") {
              alert("Mahasiswa berhasil dihapus!");
              fetchMahasiswa(); // Refresh tabel
            } else {
              alert("Gagal menghapus mahasiswa.");
            }
          })
          .catch((error) => console.error("Error deleting mahasiswa:", error));
      }
    });
  });

  
  document.querySelector("#mahasiswaForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nim = document.querySelector("#nim").value;
    const nama = document.querySelector("#nama").value;
    const jenis_kelamin = document.querySelector("#jenis_kelamin").value;
    const idMahasiswa = document.querySelector("#mahasiswaForm").dataset.id;
  
    // Jika ID mahasiswa ada, gunakan metode PUT untuk update
    if (idMahasiswa) {
      fetch(`${apiBaseUrl}?id_mahasiswa=${idMahasiswa}`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nim, nama, jenis_kelamin }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result[0]?.status === "success") {
            alert("Data berhasil diperbarui!");
            document.querySelector("#mahasiswaForm").reset();
            delete document.querySelector("#mahasiswaForm").dataset.id; // Hapus ID setelah update
            fetchMahasiswa(); // Refresh tabel
          } else {
            alert("Gagal memperbarui data.");
          }
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      // Jika tidak ada ID, gunakan metode POST untuk tambah data baru
      fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nim, nama, jenis_kelamin }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result[0]?.status === "success") {
            alert("Mahasiswa berhasil ditambahkan!");
            fetchMahasiswa(); // Refresh tabel
          } else {
            alert("Gagal menambahkan mahasiswa.");
          }
        })
        .catch((error) => console.error("Error adding mahasiswa:", error));
    }
  });

  function addDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const idMahasiswa = e.target.dataset.id;
  
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
          fetch(`${apiBaseUrl}?id_mahasiswa=${idMahasiswa}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((result) => {
              if (result[0]?.status === "success") {
                alert("Data berhasil dihapus!");
                fetchMahasiswa(); // Refresh data
              } else {
                alert("Gagal menghapus data.");
              }
            })
            .catch((error) => console.error("Error deleting data:", error));
        }
      });
    });
  }

  function addEditListeners() {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const idMahasiswa = e.target.dataset.id;
  
        // Fetch data mahasiswa yang ingin diubah
        fetch(`${apiBaseUrl}?id_mahasiswa=${idMahasiswa}`, {
            method: "PUT",
        })
          .then((response) => response.json())
          .then((data) => {
            const mahasiswa = data[0];
            document.querySelector("#nim").value = mahasiswa.nim;
            document.querySelector("#nama").value = mahasiswa.nama;
            document.querySelector("#jenis_kelamin").value = mahasiswa.jenis_kelamin;
  
            // Set data-id pada form untuk tahu ID mahasiswa yang sedang diedit
            document.querySelector("#mahasiswaForm").dataset.id = idMahasiswa;
          })
          .catch((error) => console.error("Error fetching data for edit:", error));
      });
    });
  }
  
  
  

// Panggil fungsi untuk load data awal
fetchMahasiswa();
