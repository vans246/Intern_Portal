import userModel from '../models/User.js';

export default async function ensureDefaultAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@admin.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

  const existingAdmin = await userModel.findOne({ email });

  if (existingAdmin) {
    return existingAdmin;
  }

  const admin = await userModel.create({
    fullName: 'System Administrator',
    email,
    mobileNo: '0000000000',
    internCode: 'ADMIN',
    password,
    role: 'admin',
    startDate: new Date(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  return admin;
}
