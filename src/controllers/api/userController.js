import { errors } from "../../errors/errors.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { tokenPassService } from "../../services/tokenPass.service.js";
import { usersService } from "../../services/users.service.js";
import { comparePass, hashPass } from "../../utils/crypt.js";
import { decoToken } from "../../utils/tokenGen.js";

export async function handlePutUserRole(req, res) {
  function findMatchingObjects(array, searchWord) {
    return array.find((obj) => obj.name === searchWord);
  }

  try {
    const uid = req.params.uid;
    const userToUpdate = await usersService.findUserId(uid);

    if (!userToUpdate) {
      throw new Error("INVALID_ARG");
    }
    if (userToUpdate.role === "user") {
      if (
        userToUpdate.documents &&
        findMatchingObjects(userToUpdate.documents, `${uid}-docId`) &&
        findMatchingObjects(userToUpdate.documents, `${uid}-docAdress`) &&
        findMatchingObjects(userToUpdate.documents, `${uid}-docAccount`)
      ) {
        userToUpdate.role = "premium";
        const updatedUser = await usersService.updateUser(
          "_id",
          uid,
          userToUpdate
        );
        res.status(201).json(updatedUser);
      } else {
        res.status(404).json("Data incomplete");
      }
    } else if (userToUpdate.role === "premium") {
      userToUpdate.role = "user";
      const updatedUser = await usersService.updateUser(
        "_id",
        uid,
        userToUpdate
      );
      res.status(201).json(updatedUser);
    } else {
      new errorHandler(errors.DATABASE_ERROR, req, res);
    }
  } catch (err) {
    errorHandler(err.message, req, req.res);
  }
}
export async function handlePutUserPass(req, res) {
  try {
    const userEmail = decoToken(req.body.token);
    const userDB = await usersService.findCredentials(userEmail);
    if (!userDB) {
      return new errorHandler(errors.NOT_FOUND, req, res);
    }
    if (comparePass(req.body.password, userDB.password)) {
      return new errorHandler(errors.INVALID_ARG, req, res);
    } else {
      const updatedUser = await usersService.updateUser("email", userEmail, {
        password: hashPass(req.body.password),
      });
      const removeToken = await tokenPassService.removeToken(req.body.token);
    }
    delete userDB.password;
    delete req.body.password;
    res.status(201).json("Password Changed");
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, req.res);
  }
}

export async function handlePostFileSaver(req, res) {
  const mergeDocuments = (userDocuments, newDocuments) => {
    const newDocumentNames = newDocuments.map((newDoc) => newDoc.name);
    const updatedDocuments = userDocuments.filter(
      (doc) => !newDocumentNames.includes(doc.name)
    );
    return [...updatedDocuments, ...newDocuments];
  };
  try {
    const user = await usersService.findUserId(req.params.uid);
    if (!user) {
      throw new errorHandler(errors.NOT_FOUND);
    }
    const newDocuments = req.files.map((file) => ({
      name: file.filename,
      reference: file.path,
    }));
    const userDocuments = [...user.documents];
    const updatedDocuments = mergeDocuments(userDocuments, newDocuments);
    if (updatedDocuments.length === user.documents.length) {
      return res
        .status(200)
        .json({ message: "Updated files but no the names" });
    }
    await usersService.updateUser("_id", req.params.uid, {
      documents: updatedDocuments,
    });

    res.status(201).json({ message: "User documents updated successfully" });
  } catch (err) {
    console.error("Error:", err);
    new errorHandler(errors.INVALID_ARG, req, res);
  }
}
