import { SelectUser } from "@/types/user.types";

export function generateMockUsers(): SelectUser[] {
  let users: SelectUser[] = [];
  for (let i = 0; i < 100; i++) {
    const [firstName, lastName] = generateRandomNames();
    users.push({
      id: i.toString(),
      firstName: firstName,
      lastName: lastName,
      email: `${firstName}@cobroke.com`,
      password: "password",
      role: "user",
      contactNumber: "1234567890",
      isActive: true,
      isApproved: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return users;
}

function generateRandomNames(): string[] {
  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const firstName =
    alphabets[Math.floor(Math.random() * alphabets.length)] +
    alphabets[Math.floor(Math.random() * alphabets.length)] +
    alphabets[Math.floor(Math.random() * alphabets.length)];
  const lastName =
    alphabets[Math.floor(Math.random() * alphabets.length)] +
    alphabets[Math.floor(Math.random() * alphabets.length)] +
    alphabets[Math.floor(Math.random() * alphabets.length)];
  return [firstName, lastName];
}
