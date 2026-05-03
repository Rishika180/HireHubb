import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Signup clicked");

    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
        toast.error("Please fill all fields");
        return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
        formData.append("file", input.file);
    }

    try {
        dispatch(setLoading(true));

        const res = await axios.post(
            `${USER_API_END_POINT}/register`,
            formData,
            {
                timeout: 15000,
                withCredentials: false,
            }
        );

        if (res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
        }

    } catch (error) {
        console.log(error);
         dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
        dispatch(setLoading(false));
    }
};

  useEffect(() => {
    dispatch(setLoading(false));
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          {/* ROLE */}
          <div className="flex gap-4 my-4">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              Student
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              Recruiter
            </label>
          </div>

          {/* FILE */}
          <div className="my-4">
            <Label>Profile</Label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>

          {/* BUTTON */}
          {loading ? (
            <button
              disabled
              className="w-full my-4 bg-gray-400 text-white p-2 rounded"
            >
              Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full my-4 bg-black text-white p-2 rounded"
            >
              Signup
            </button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;