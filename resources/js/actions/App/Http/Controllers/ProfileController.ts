import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProfileController::index
 * @see app/Http/Controllers/ProfileController.php:20
 * @route '/profile'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ProfileController::update
 * @see app/Http/Controllers/ProfileController.php:30
 * @route '/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProfileController::update
 * @see app/Http/Controllers/ProfileController.php:30
 * @route '/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::update
 * @see app/Http/Controllers/ProfileController.php:30
 * @route '/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProfileController::update
 * @see app/Http/Controllers/ProfileController.php:30
 * @route '/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::update
 * @see app/Http/Controllers/ProfileController.php:30
 * @route '/profile'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ProfileController::updateAvatar
 * @see app/Http/Controllers/ProfileController.php:60
 * @route '/profile/avatar'
 */
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::updateAvatar
 * @see app/Http/Controllers/ProfileController.php:60
 * @route '/profile/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::updateAvatar
 * @see app/Http/Controllers/ProfileController.php:60
 * @route '/profile/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProfileController::updateAvatar
 * @see app/Http/Controllers/ProfileController.php:60
 * @route '/profile/avatar'
 */
    const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::updateAvatar
 * @see app/Http/Controllers/ProfileController.php:60
 * @route '/profile/avatar'
 */
        updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvatar.url(options),
            method: 'post',
        })
    
    updateAvatar.form = updateAvatarForm
/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:92
 * @route '/profile/password'
 */
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/profile/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:92
 * @route '/profile/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:92
 * @route '/profile/password'
 */
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:92
 * @route '/profile/password'
 */
    const updatePasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePassword.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:92
 * @route '/profile/password'
 */
        updatePasswordForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePassword.form = updatePasswordForm
const ProfileController = { index, update, updateAvatar, updatePassword }

export default ProfileController