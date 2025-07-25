// mockData/users.js
export const mockUsers = [
  {
    _id: "user_001",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1,
      "Moderator": 2
    },
    createdAt: "2024-01-15T10:30:00Z",
    flaggedComments: {
      amount: 8
    },
    userId: "uid_001",
    status: "escalate_admin",
    comment: "Inappropriate language in multiple posts"
  },
  {
    _id: "user_002",
    firstname: "Sarah",
    lastname: "Johnson",
    email: "sarah.johnson@example.com",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-02-20T14:45:00Z",
    flaggedComments: {
      amount: 2
    },
    userId: "uid_002",
    status: "false_positive",
    comment: "Reported for spam but content seems legitimate"
  },
  {
    _id: "user_003",
    firstname: "Mike",
    lastname: "Chen",
    email: "mike.chen@example.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1,
      "Admin": 3
    },
    createdAt: "2024-01-08T09:15:00Z",
    flaggedComments: {
      amount: 12
    },
    userId: "uid_003",
    status: "pending",
    comment: "Multiple harassment reports from different users"
  },
  {
    _id: "user_004",
    firstname: "Emily",
    lastname: "Rodriguez",
    email: "emily.rodriguez@example.com",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-03-01T16:20:00Z",
    flaggedComments: {
      amount: 4
    },
    userId: "uid_004",
    status: "escalate_moderator",
    comment: "Posting potentially misleading information"
  },
  {
    _id: "user_005",
    firstname: "David",
    lastname: "Wilson",
    email: "david.wilson@example.com",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: {
      "Moderator": 2
    },
    createdAt: "2024-02-14T11:30:00Z",
    flaggedComments: {
      amount: 1
    },
    userId: "uid_005",
    status: "false_positive",
    comment: "Auto-flagged for keywords but context is appropriate"
  },
  {
    _id: "user_006",
    firstname: "Lisa",
    lastname: "Thompson",
    email: "lisa.thompson@example.com",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-03-10T13:45:00Z",
    flaggedComments: {
      amount: 7
    },
    userId: "uid_006",
    status: "pending",
    comment: "Repeated violations of community guidelines"
  },
  {
    _id: "user_007",
    firstname: "Robert",
    lastname: "Brown",
    email: "robert.brown@example.com",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1,
      "Admin": 3
    },
    createdAt: "2024-01-25T08:00:00Z",
    flaggedComments: {
      amount: 15
    },
    userId: "uid_007",
    status: "escalate_admin",
    comment: "Severe policy violations requiring immediate attention"
  },
  {
    _id: "user_008",
    firstname: "Amanda",
    lastname: "Davis",
    email: "amanda.davis@example.com",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-02-28T15:10:00Z",
    flaggedComments: {
      amount: 3
    },
    userId: "uid_008",
    status: "pending",
    comment: "Borderline content that needs review"
  },
  {
    _id: "user_009",
    firstname: "James",
    lastname: "Miller",
    email: "james.miller@example.com",
    photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    role: {
      "Moderator": 2
    },
    createdAt: "2024-03-05T12:25:00Z",
    flaggedComments: {
      amount: 0
    },
    userId: "uid_009",
    status: "false_positive",
    comment: "False alarm - no actual violations found"
  },
  {
    _id: "user_010",
    firstname: "Jennifer",
    lastname: "Garcia",
    email: "jennifer.garcia@example.com",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-03-12T17:30:00Z",
    flaggedComments: {
      amount: 9
    },
    userId: "uid_010",
    status: "escalate_moderator",
    comment: "Pattern of disruptive behavior across multiple threads"
  },
  {
    _id: "user_011",
    firstname: "Christopher",
    lastname: "Martinez",
    email: "chris.martinez@example.com",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1,
      "Admin": 3
    },
    createdAt: "2024-01-30T10:15:00Z",
    flaggedComments: {
      amount: 5
    },
    userId: "uid_011",
    status: "pending",
    comment: "Needs further investigation for policy compliance"
  },
  {
    _id: "user_012",
    firstname: "Michelle",
    lastname: "Lee",
    email: "michelle.lee@example.com",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    role: {
      "User": 1
    },
    createdAt: "2024-02-18T14:00:00Z",
    flaggedComments: {
      amount: 1
    },
    userId: "uid_012",
    status: "false_positive",
    comment: "Misunderstood context led to false flagging"
  }
];

// Mock API functions to simulate your useUser hook
export const mockUserAPI = {
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 1000); // Simulate API delay
    });
  },

  escalateUser: (userId, toRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u._id === userId);
        if (user) {
          user.role[toRole.charAt(0).toUpperCase() + toRole.slice(1)] = toRole === 'admin' ? 3 : 2;
          user.status = `escalate_${toRole}`;
          resolve({ success: true, user });
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u._id === userId);
        if (index !== -1) {
          mockUsers.splice(index, 1);
          resolve({ success: true, message: 'User deleted successfully' });
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  },

  freezeUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u._id === userId);
        if (user) {
          user.status = 'frozen';
          resolve({ success: true, user });
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  },

  restoreUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u._id === userId);
        if (user) {
          user.status = 'active';
          resolve({ success: true, user });
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  }
};