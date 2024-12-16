import axios from 'axios';
import { useSelector } from 'react-redux';
import { time_tracker_active } from '../Api/TimeTrackerAPIs';
import { selectAccess } from '../Slices/authSlice';
import store from '../Store/store';


store.subscribe(() => {
  const state = store.getState();
  const userAction = state.userActions;
  const access = state.auth.access
  const user_type = state.auth.user_type
  const users = ['GroupLeader','ProductCoordinator','TeamMember','DistrictCoordinator','ExecutiveOfficeAdmin']
  if (userAction) {
    // Make the API call based on the user action
    // You can use a library like axios to make the API call
    // Call the API here
    // if(users.includes(user_type)){
    //     try{
    //         let url = time_tracker_active
    //         const result = axios.get(url,
    //             { headers: {"Authorization" : `Bearer ${access}`} })
    //         console.log(result);
              
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
  }
});
