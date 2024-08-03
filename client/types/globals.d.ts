export { };

// Create a type for the roles
export type Roles = "admin" | "moderator" | "org:admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}