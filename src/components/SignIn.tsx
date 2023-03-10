import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('data', data);
    signIn();
  };
  if (!isValid) console.log('errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div>
        <label>
          Username
          <input
            type="text"
            placeholder=""
            {...register('username', {
              required: 'ユーザー名を入力してください。',
              maxLength: 30,
            })}
          />
        </label>
        {errors.username && (
          <span className="text-red-600">
            {errors.username.message?.toString()}
          </span>
        )}
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            placeholder=""
            {...register('password', {
              required: 'パスワードを入力してください。',
              maxLength: 30,
            })}
          />
        </label>
        {errors.password && (
          <span className="text-red-600">
            {errors.password.message?.toString()}
          </span>
        )}
      </div> */}
      <div>ログインしてください。</div>

      <input type="submit" />
    </form>
  );
}
