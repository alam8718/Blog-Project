import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client); //bucket is basically the storage
  }

  //! createpost part
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      )
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
    }
  }
  //! update part
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
    }
  }

  //! delete part 
  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
      return false
    }
  }

  //! getting one post part
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
      return false
    }
  }

  //! getting all the post 
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,

      )
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
      return false
    }
  }

  //! file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file,
      )
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
      return false
    }
  }

  //! delete file part
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketID,
        fileId
      )
      return true
    } catch (err) {
      console.log("Appwrite service :: createPost :: error", err);
      return false
    }
  }

  //! file preview part
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketID,
      fileId
    )
  }


}



const service = new Service()
export default service