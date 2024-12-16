import BasicDetails from './BasicDetails';
import ChangePassword from './ChangePassword';

const UserProfile = () => {
  return (
    <div className="flex flex-col mobile:flex-row gap-8 mt-8">
      <BasicDetails />
      <ChangePassword />
    </div>
  );
};

export default UserProfile;
