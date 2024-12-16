import SubmitButton from '../../../../Components/Buttons/SubmitButton';
import Datepicker from '../../../../Components/DateAndTime/Datepicker';
import Timepicker from '../../../../Components/DateAndTime/Timepicker';
import EditorInput from '../../../../Components/Inputs/EditorInput';
import Input from '../../../../Components/Inputs/Input';
import SelectComponent from '../../../../Components/Inputs/Select';
import arrow from '../../../../assets/arrow-right.svg';
import location_icon from '../../../../assets/location.svg';
import map_icon from '../../../../assets/map.svg';
import CancelButton from '../../../../Components/Buttons/CancelButton';
import { useCitiesListQuery } from '../../../../ApiQueries/AllEvent/EventQueries';

const OtherDetails = ({ id, formik, handleDateChange, handleTimeChange, loading, setActive }) => {
  const { data: cities, isFetching } = useCitiesListQuery()

  const handleEditorChange = (value) => {
    formik.setFieldValue('eventDetails', value);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className=" max-w-full mobile:max-w-[840px] mx-auto rounded-lg mt-11">
        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-1">
          <label className="w-48 text-text_black font-semibold ">Venue</label>
          <Input icons={location_icon} className="bg-btn_grey" placeholder="Venue Name" name="venue" value={formik.values.venue} errors={formik.errors.venue} touched={formik.touched.venue} handleChange={formik.handleChange} />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-8">
          <label className="w-48 text-text_black font-semibold">Location</label>
          <SelectComponent
            options={cities?.data}
            icons={map_icon}
            className="bg-btn_grey font-thin"
            placeholder="Location"
            name="locationName"
            constant={false}
            value={formik.values.locationName}
            errors={formik.errors.locationName}
            touched={formik.touched.locationName}
            onChange={(selectedOptions) => {
              formik.setFieldValue('locationName', selectedOptions);
            }}
          />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-8">
          <label className="w-48 text-text_black font-semibold">Date</label>
          <Datepicker onChange={handleDateChange} format="dddd DD MMM YYYY" name="eventDate" value={formik.values.eventDate} errors={formik.errors.eventDate} touched={formik.touched.eventDate} pastDisable={true} />
        </div>

        <div className="flex flex-col mobile:flex-row  mb-8 gap-8">
          <div className="flex flex-col sm:flex-row w-full">
            <label className="text-text_black font-semibold">Time</label>
            <div className="w-full sm:ml-[132px] ml-0">
              <Timepicker disabled={false} onChange={(e) => handleTimeChange(e, 'startTime')} name="startTime" errors={formik.errors.startTime} touched={formik.touched.startTime} value={formik.values.startTime} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mobile:w-4/6 w-full gap-4 sm:items-center">
            <label className=" text-text_black font-semibold ">To</label>
            <div className="w-full sm:ml-32 mobile:ml-0">
              <Timepicker onChange={(e) => handleTimeChange(e, 'endTime')} name="endTime" startTime={formik.values.startTime || ''} errors={formik.errors.endTime} touched={formik.touched.endTime} value={formik.values.endTime} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-8">
          <label className="w-48 text-text_black font-semibold">Event details</label>
          <EditorInput name="eventDetails" value={formik.values.eventDetails} handleChange={handleEditorChange} viewDescription={false} />
        </div>
        <div className="flex w-full gap-3 mt-16 justify-between">
          <div className="mobile:w-1/4 w-2/4 mt-10">
            <CancelButton label="Back" onClick={() => setActive('2')} type="button" />
          </div>
          <div className="mobile:w-1/4 w-2/4 mt-10">
            <SubmitButton label={id ? 'Save Changes' : 'Submit'} loading={loading} icon={arrow} type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default OtherDetails;
