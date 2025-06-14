
import { signIn } from "../auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        alert('test')
        await signIn("google")
      }}
    >
      <button type="submit w-10 h1">Signin with Google</button>
    </form>
  )
} 