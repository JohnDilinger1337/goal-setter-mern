import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getGoals, rest } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.goals
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error('An error occurred while procssing your request!');
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(rest());
    };
  }, [user, isError, message, dispatch, navigate]);

  console.log(goals);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="Heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You don't have any goals yet!</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
