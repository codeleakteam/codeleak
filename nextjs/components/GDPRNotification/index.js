import { notification, Button, Icon } from 'antd'
import Link from 'next/link'

const setLocalStorage = () => {
  localStorage.setItem('codeleak-cookies', Date.now())
}

const GdprNotification = () => {
  const key = `open${Date.now()}`
  const btn = (
    <div>
      <Button
        onClick={() => {
          notification.close(key)
          setLocalStorage()
        }}
        type="primary"
        style={{ marginRight: 8 }}
      >
        I Accept
      </Button>
      <Link href="/cookies">
        <a>Learn more</a>
      </Link>
    </div>
  )

  notification.open({
    message: 'Cookie time!',
    description: 'Codeleak uses cookies to ensure you have the best experience using our website!',
    btn,
    key,
    placement: 'bottomLeft',
    duration: 0,
    icon: <Icon type="smile" />,
  })
}

export default GdprNotification
