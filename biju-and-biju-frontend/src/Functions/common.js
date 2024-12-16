import Swal from 'sweetalert2'
import axios from "axios";


export function delete_swal(url,access,msg) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                const result = await axios.delete(url,
                    { headers: {"Authorization" : `Bearer ${access}`} }
                    )
                if(result.status === 204){
                    Swal.fire({
                        title: 'Deleted!',
                        text: msg,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
      })

  }