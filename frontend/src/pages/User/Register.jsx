import { useState } from 'react'
import { motion } from 'framer-motion'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    user_type: 'Traveler'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.status === 'success') {
        // Handle successful registration
        alert('Registration successful!')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="register-container">
      <motion.div 
        className="register-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Join Our Community</h2>
        <form onSubmit={handleSubmit}>
          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <select
              value={formData.user_type}
              onChange={(e) => setFormData({...formData, user_type: e.target.value})}
              required
            >
              <option value="Traveler">Traveler</option>
              <option value="Community">Community</option>
            </select>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Register
