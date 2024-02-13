package com.tm.api.services;

import com.tm.api.exceptions.UserNotFoundException;
import com.tm.api.model.dto.PaginationResponse;
import com.tm.api.model.dto.UserDto;
import com.tm.api.model.dto.UserInfoDto;
import com.tm.api.model.entity.User;
import com.tm.api.model.enumerations.UserRole;
import com.tm.api.model.projection.IUser;
import com.tm.api.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserService(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    /**
     * Update given user with new information in parameter
     *
     * @param newInfo new information values of user
     * @param user    user entity to be updated
     * @return viewable attributes of user after patch
     */
    private UserInfoDto updateUser(UserInfoDto newInfo, User user) {
        user.updateUser(newInfo);
        User updatedUser = userRepository.save(user);
        return new UserInfoDto(updatedUser);
    }

    /**
     * <pre>User Operation</pre>
     * To update information of authenticated user
     *
     * @param newInfo new information values of user
     * @return viewable attributes of user after patch
     */
    public UserInfoDto updateUser(UserInfoDto newInfo) {
        return updateUser(newInfo, authService.getAuthenticatedUserInfo());
    }

    /**
     * <pre>Admin Operation</pre>
     * To update information of user with given id
     *
     * @param newInfo new information values of user
     * @param id      id of user to be updated
     * @return viewable attributes of user after patch
     * @throws UserNotFoundException if user with given id does not exist
     */
    public UserInfoDto updateUser(UserInfoDto newInfo, Long id) throws UserNotFoundException {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        if (user.getRole() == UserRole.ADMIN) {
            throw new UnsupportedOperationException("You are not allowed to change information of another admin user");
        }
        return updateUser(newInfo, user);
    }

    /**
     * <pre>Admin Operation</pre>
     * To promote user with given id to admin role
     *
     * @param id id of user to promote to admin
     * @return new user information with new role
     * @throws UserNotFoundException if user with given id does not exist
     */
    public UserDto promoteUser(Long id) throws UserNotFoundException {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.setRole(UserRole.ADMIN);
        User updatedUser = userRepository.save(user);
        return new UserDto(updatedUser);
    }

    public PaginationResponse<IUser> getUsers(int page, int size) {
        Page<IUser> pageQueryResult = userRepository.findAllBy(PageRequest.of(page, size));
        return PaginationResponse.<IUser>builder().data(pageQueryResult.getContent())
                .totalData(pageQueryResult.getTotalElements())
                .pageCount(pageQueryResult.getTotalPages()).pageNumber(page).build();
    }
}
