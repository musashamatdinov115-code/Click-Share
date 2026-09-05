import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import { store } from "../store/store"
import { router } from "../router/router"

function MainProvider() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default MainProvider