import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));

    setText('');
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal:</label>
          <input
            type="text"
            id="text"
            name="text"
            required
            value={text}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
