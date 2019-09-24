import flags from '../models/flag-data';

const viewFlags = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'success',
    data: flags,
  });
};


export default {
  viewFlags,
};
